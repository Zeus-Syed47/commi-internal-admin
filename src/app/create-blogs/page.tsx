'use client'
import { Grid, Button, Typography } from "@mui/joy"
import { ChevronLeft } from '@mui/icons-material';
import CreateBlogsForm from "@/components/Blogs/CreateBlogsForm";

function CreateBlogs () {
  return (
    <Grid
      sx={{
        width: '100%',
        p: 2,
        px: { sm: 6, xs: 2 },
        display: 'flex',
        flexDirection: 'column',
        height: '100vh', // full screen height
        pt: { xs: 'calc(10px + var(--Header-height))', sm: 2.5 },
      }}
    >
      {/* Header */}
            <Grid
              sx={{
                flexShrink: 0, // don’t shrink the header
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 2,
                mb: 2,
              }}
            >
              {/* Left side: back + title */}
              <Grid sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                <Button 
                startDecorator={<ChevronLeft />} 
                // onClick={handleBackClick}
                >
                  Back
                </Button>
                <Typography level="h4">
                  {/* {Object.keys(selectedContactForEdit)?.length > 0 ? 'Edit' : 'Create'} Contact */}
                  Blogs
                </Typography>
              </Grid>
            </Grid>


              <Grid
                sx={{
                  flex: 1,              // take remaining height
                  overflowY: 'auto',    // scrollable if content overflows
                  minHeight: 0,         // critical for flexbox scrolling
                }}
              >
                <CreateBlogsForm/>
              </Grid>
    </Grid>
  )
}

export default CreateBlogs
