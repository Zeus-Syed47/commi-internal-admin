'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import { Breadcrumbs, Button, Typography, IconButton, Input } from '@mui/joy';
import { Add, Delete, Download, Sync, UploadRounded } from '@mui/icons-material';
import { Grid2, Drawer } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import ResponsiveDrawer from '@/components/drawer/MobileResponsiveDrawer';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/routes/localRoutes';
import { getLocaleString } from '@/utils/getLocale';
import { toast } from 'react-toastify';
import useDatasources from '@/hooks/useDatasources';
import DatasourceTable from '@/components/datasources/DatasourcesTable';
import DatasourcesList from '@/components/datasources/DatasourcesList';
import TextInput from '@/components/input/TextField';

export default function Datasources() {

  const router = useRouter()
  const { openDrawer,
    setOpenDrawer, datasources,
    isLoading,
    totalRows, currentPage, setCurrentPage,
    currentUser,
    datasourcesFile,
    setDatasourcesFile,
    importDatasourcesHandler, isImporting, inputRef,
    description, setDescription, website, setWebsite,
    name, setName
  } = useDatasources()


  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files

    console.log('acceptedFiles', acceptedFiles)

    setDatasourcesFile(acceptedFiles[0])

  }, [setDatasourcesFile])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop, accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
      'application/rtf': ['.rtf'],
    }
  })

  const dropzoneStyle = {
    border: '2px dashed #cccccc',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: isDragActive ? '#e0ffe0' : isDragReject ? '#ffe0e0' : '#f8f8f8',
    cursor: 'pointer',
    width: '100%',

  };

  const toggleDrawer =
    () =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setOpenDrawer(false);
      };


  return (
    <>
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: 'calc(12px + var(--Header-height))',
            sm: 'calc(12px + var(--Header-height))',
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          height: '100dvh',
          gap: 1,
          backgroundColor: 'background.level1',
          overflow: { xs: 'auto', md: 'hidden' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            // mb: 1,
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            backgroundColor: 'background.level1',
          }}
        >

          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >

            <Typography level='h4' color="primary" >
              Datasources - {totalRows}
            </Typography>
          </Breadcrumbs>
          <Box sx={{
            alignSelf: 'flex-end'
          }}>
            <Button
              color="primary"
              startDecorator={<UploadRounded />}
              sx={{
                ml: 2,
                // backgroundColor: "#2BB673"
              }}
              size="sm"
              onClick={() => {
                if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                  setOpenDrawer(true)
                }
                else {
                  toast.warning(getLocaleString('integrateWaba'))
                }
              }}
            >
              Import
            </Button>
          </Box>
        </Box>
        <DatasourceTable rows={datasources ?? []}
          isLoading={isLoading}
          totalRows={totalRows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          inputRef={inputRef}
        // onEdit={(row) => {
        //   onEditRow(row);
        // }}
        // onDelete={(row) => {
        //   onDelete(row);
        // }}
        />
        <DatasourcesList rows={datasources ?? []} isLoading={isLoading}
          totalRows={totalRows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}


        />
      </Box>

      <ResponsiveDrawer
        anchor={'right'}
        open={openDrawer}
        onClose={toggleDrawer()}
        hideFooter={true}
      >
        <Grid2 sx={{
          width: '100%',
          p: 4
        }}>
          <Box sx={{
            mt: 2, mb: 4, width: '100%', minWidth: {
              sm: '460px',
              xs: '300px'
            }
          }}>
            <Typography level="body1" sx={{ mb: 1 }}>
              Name
            </Typography>
            <Input
              placeholder="Enter name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)
              }
            />
          </Box>
          <Box sx={{
            mt: 2, mb: 4, width: '100%', minWidth: {
              sm: '460px',
              xs: '300px'
            }
          }}>
            <Typography level="body1" sx={{ mb: 1 }}>
              Description
            </Typography>
            <Input
              placeholder="Enter description"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)
              }
            />
          </Box>
          {!datasourcesFile &&
            <Box sx={{
              mt: 2, mb: 4, width: '100%', minWidth: {
                sm: '460px',
                xs: '300px'
              }
            }}>
              <Typography level="body1" sx={{ mb: 1 }}>
                Website
              </Typography>
              <Input
                placeholder="Enter website"
                fullWidth
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Box>
          }
          {!website && !datasourcesFile &&
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 0 }}>
              <Typography level='body-md' sx={{ mb: 1, fontWeight: 'bold', alignSelf: 'center' }}>
                OR
              </Typography>
            </Box>
          }
          {!website &&
            <>
              <Typography level="body1" sx={{ mb: 1 }}>
                File
              </Typography>
              <Box sx={dropzoneStyle}>
                {datasourcesFile ?
                  <Box>
                    <Typography variant="h6" component="div" gutterBottom>
                      File Selected: {datasourcesFile?.name}
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setDatasourcesFile(null)
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                  :
                  <div {...getRootProps()} >
                    <input {...getInputProps()} />
                    {
                      isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                  </div>
                }
              </Box>
            </>
          }


          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 6 }}>
            <Button size="sm" variant="outlined" color="neutral"
              onClick={() => {
                setOpenDrawer(false)
              }
              }
            >
              Cancel
            </Button>
            <Button size="sm" variant="solid"
              sx={{
                ml: 2
              }}
              loading={isImporting}
              onClick={() => {
                importDatasourcesHandler()
              }}>
              Save
            </Button>
          </Box>
        </Grid2>
      </ResponsiveDrawer >
    </>
  );

}