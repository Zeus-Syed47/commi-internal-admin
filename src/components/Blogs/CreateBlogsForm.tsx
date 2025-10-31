'use client'

import { Box } from "@mui/joy"
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import { Typography } from '@mui/joy';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import { MenuItem, Toolbar, IconButton, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useRef, useState } from "react";
import { useBlogFormStore } from "@/store/blogStore";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CreateBlogsForm = () => {
  const quillRef = useRef<ReactQuill>(null);
  const [formats, setFormats] = useState({});
  const [blogPreview, setBlogPreview] = useState<string | null>(null);

  const {
    title, setTitle,
    slug, setSlug,
    category, setCategory,
    date, setDate,
    excerpt, setExcerpt,
    content, setContent,
    author, setAuthor,
    file, setFile,
    submit,
    reset,
    isSubmitting
  } = useBlogFormStore();

  // Cover image dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      setFile(file);
      setBlogPreview(URL.createObjectURL(file));
    }
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    noClick: true,
  });

  const handleRemove = useCallback(() => {
    setFile(null);
    setBlogPreview(null);
  }, [setFile]);

  const applyFormat = useCallback((format: string, explicitValue?: any) => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection();
    const currentFormats = range ? editor.getFormat(range) : editor.getFormat();
    const isActive = !!currentFormats[format];
    const value = typeof explicitValue !== "undefined" ? explicitValue : !isActive;
    editor.format(format, value);
    setFormats(prev => ({ ...prev, [format]: value }));
  }, []);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const editor = quillRef.current?.getEditor();
      if (!editor) return;
      const range = editor.getSelection(true);
      const index = (range && range.index) || editor.getLength();
      editor.insertEmbed(index, "image", reader.result);
      editor.setSelection(index + 1);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleEditorChange = useCallback((value: string) => {
    setContent(value);
  }, [setContent]);

  // const handleClick = ()=>{
  //   console.log()
  // }

  return (
    <Box
      component="main"
      sx={{
        pt: 3,
        pb: 3,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100dvh',
      }}
    >
      <Stack spacing={4} sx={{ maxWidth: 1000, mx: 'auto', px: 4 }}>
        <Card>
          <Typography level="title-md" sx={{ mb: 1 }}>Blog info</Typography>
          <Divider />

          <Stack spacing={2} sx={{ mt: 2 }}>
            {/* Title */}
            <FormLabel>Title</FormLabel>
            <Input
              size="sm"
              placeholder="Enter title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            {/* Slug */}
            <FormLabel>Slug</FormLabel>
            <Input
              size="sm"
              placeholder="Enter slug"
              value={slug}
              onChange={e => setSlug(e.target.value)}
            />

            {/* Toolbar */}
            <Toolbar variant="dense" sx={{ border: "1px solid #ccc", borderRadius: 1, bgcolor: "#fff", mb: 1 }}>
              <Select
                value={formats.header ? String(formats.header) : "normal"}
                size="small"
                sx={{ mr: 1 }}
                onChange={e => {
                  const val = e.target.value;
                  applyFormat("header", val === "normal" ? false : Number(val));
                }}
              >
                <MenuItem value="normal">Normal Text</MenuItem>
                <MenuItem value="1">Heading 1</MenuItem>
                <MenuItem value="2">Heading 2</MenuItem>
                <MenuItem value="3">Heading 3</MenuItem>
              </Select>

              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

              <IconButton size="small" onClick={() => applyFormat("bold")} sx={formats.bold ? { bgcolor: "rgba(0,0,0,0.08)" } : {}}>
                <FormatBoldIcon />
              </IconButton>
              <IconButton size="small" onClick={() => applyFormat("italic")} sx={formats.italic ? { bgcolor: "rgba(0,0,0,0.08)" } : {}}>
                <FormatItalicIcon />
              </IconButton>
              <IconButton size="small" onClick={() => applyFormat("underline")} sx={formats.underline ? { bgcolor: "rgba(0,0,0,0.08)" } : {}}>
                <FormatUnderlinedIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => {
                  if (formats.link) {
                    applyFormat("link", false);
                    return;
                  }
                  const url = window.prompt("Enter link URL:");
                  if (url) applyFormat("link", url);
                }}
                sx={formats.link ? { bgcolor: "rgba(0,0,0,0.08)" } : {}}
              >
                <LinkIcon />
              </IconButton>
              <IconButton size="small" component="label">
                <ImageIcon />
                <input type="file" accept="image/*" hidden onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }} />
              </IconButton>
            </Toolbar>

            {/* Blog content */}
            <ReactQuill
              ref={quillRef}
              theme="snow"
              placeholder="Write your blog content here..."
              style={{ height: 300, marginBottom: 20 }}
              modules={{ toolbar: false }}
              value={content}
              onChange={handleEditorChange}
            />

            {/* Category */}
            <FormLabel>Category</FormLabel>
            <Select
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="lifestyle">Lifestyle</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="education">Education</MenuItem>
            </Select>

            {/* Date */}
            <FormLabel>Created Date</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Publish Date"
                value={date ? dayjs(date) : null}
                onChange={(newValue) =>
                  setDate(newValue ? newValue.toDate() : null)
                }
              />
            </LocalizationProvider>

            {/* Excerpt */}
            <FormLabel>Excerpt</FormLabel>
            <ReactQuill
              theme="snow"
              placeholder="Excerpt"
              style={{ height: 100 }}
              modules={{ toolbar: false }}
              value={excerpt}
              onChange={setExcerpt}
            />

            {/* Cover Image Dropzone */}
            <Box {...getRootProps()} sx={{ border: "2px dashed #ccc", borderRadius: 2, p: 4, textAlign: "center", cursor: "pointer", minHeight: 180, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", position: "relative", bgcolor: isDragActive ? "#f9f9f9" : "transparent" }}>
              <input {...getInputProps()} />
              {blogPreview ? (
                <>
                  <Box component="img" src={blogPreview} sx={{ maxHeight: 160, borderRadius: 1 }} />
                  <IconButton size="small" onClick={handleRemove} sx={{ position: "absolute", top: 8, right: 8 }}>
                    <DeleteIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <ImageIcon sx={{ fontSize: 40, color: "gray", mb: 1 }} />
                  <Typography variant="body1">Drag and Drop Images or</Typography>
                  <Button variant="text" onClick={open} sx={{ mt: 1 }}>Upload Image</Button>
                </>
              )}
            </Box>

            {/* Author */}
            <FormLabel>Author</FormLabel>
            <Input
              placeholder="Author name"
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />

            {/* Actions */}
            <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
              <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
                <Button size="sm" variant="solid" disabled={isSubmitting} onClick={submit}>
                  {isSubmitting ? "Publishing..." : "Publish"}
                </Button>
                <Button size="sm" onClick={reset}>Cancel</Button>
              </CardActions>
            </CardOverflow>
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}

export default CreateBlogsForm;
