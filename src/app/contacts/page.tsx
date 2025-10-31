'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import { Breadcrumbs, Button, Typography, IconButton } from '@mui/joy';
import { Add, Delete, Download, Sync, UploadRounded } from '@mui/icons-material';
import { Grid2, Drawer } from '@mui/material';
import useContacts from '@/hooks/useContacts';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect } from 'react';
import ResponsiveDrawer from '@/components/drawer/MobileResponsiveDrawer';
import ContactTable from '@/components/contacts/ContactsTable';
import ContactList from '@/components/contacts/ContactsList';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { useRouter } from 'next/navigation';
import { routes } from '@/utils/routes/localRoutes';
import { getLocaleString } from '@/utils/getLocale';
import { toast } from 'react-toastify';
import AttributeSelector from '@/components/attributes/AttributesSelector';

export default function Contacts() {

  const router = useRouter()
  const { openDrawer,
    setOpenDrawer, contacts,
    isLoading, debouncedSearch, search, searchKey, setSearchKey,
    totalRows, currentPage, setCurrentPage, importContactsApi,
    onEditRow, onDelete, onFilterChange, attributes, filterConditions,
    filter, debouncedFilterSearch, inputRef,
    inputFilterRef, addAttributeButtonHandler,
    removeAttributeButtonHandler,
    filters, currentUser, onFilterInputChange, filterInputs,
    platform, isContactDeleting, openDelete, setOpenDelete,
    updateUserHandler, contactsFile, setContactsFile,
    importContactsHandler, handleAttributeChange, removeButtonHandler,
    addButtonHandler, contactAttributes, isImporting, makeCall, isCallMaking, callId
  } = useContacts({
    forBroadcast: false
  })

  useEffect(() => {
    const handleMessage = (event) => {
      console.log("Received fcmToken from React Native:", event.data.key, (event.data.value));
      if (event.data.key === "fcmToken") {
        updateUserHandler(event.data.value)
      }
    }

    window.addEventListener("message", handleMessage);

    // 👇 Cleanup the listener on unmount
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files

    console.log('acceptedFiles', acceptedFiles)

    setContactsFile(acceptedFiles[0])

    // if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {

    //   let formData = new FormData()
    //   formData.append('company_id', currentUser?.company?.id)
    //   formData.append('waba_meta_id', currentUser?.company?.wabas[0]?.waba_meta_id)
    //   formData.append('phone_number_id', currentUser?.company?.wabas[0]?.businessnumbers[0]?.business_phone_id) // TODO: 
    //   formData.append('file', acceptedFiles[0])

    //   importContactsApi(formData)
    // }

  }, [setContactsFile])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop, accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
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
        className="main-contact-box"
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
          overflow: 'auto',
          // border: '1px solid black'
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
          {/* <Typography level="h2" component="h1">
            Contacts
          </Typography> */}

          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >




            <Typography level='h4' color="primary" >
              Contacts - {totalRows}
            </Typography>
          </Breadcrumbs>
          <Box sx={{
            alignSelf: 'flex-end'
          }}>
            {(platform === 'ios' || platform === 'android') &&
              <Button
                color="primary"
                startDecorator={<Sync />}
                // sx={{
                //   // backgroundColor: "#2BB673"
                // }}
                size="sm"
                onClick={() => {
                  if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                    router.push(routes.contacts.sync)
                  }
                  else {
                    toast.warning(getLocaleString('integrateWaba'))
                  }
                }}
              >
                Sync
              </Button>
            }
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
            <Button
              sx={{
                ml: 2,
                // backgroundColor: "#2BB673"
              }}
              color="primary"
              startDecorator={<Add />}
              size="sm"
              onClick={() => {
                if (currentUser?.company?.wabas?.length && currentUser?.company?.wabas[0]?.waba_meta_id) {
                  router.push(routes.contacts.create)
                }
                else {
                  toast.warning(getLocaleString('integrateWaba'))
                }
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
        <ContactTable rows={contacts ?? []}
          isLoading={isLoading}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          search={search}
          handleSearch={debouncedSearch}
          totalRows={totalRows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onEdit={(row) => {
            onEditRow(row);
          }}
          onDelete={(row) => {
            onDelete(row);
          }}
          onFilterChange={onFilterChange}
          attributes={attributes}
          filterConditions={filterConditions}
          filter={filter}
          debouncedFilterSearch={debouncedFilterSearch}
          inputRef={inputRef}
          inputFilterRef={inputFilterRef}
          addAttributeButtonHandler={addAttributeButtonHandler}
          removeAttributeButtonHandler={removeAttributeButtonHandler}
          filters={filters}
          onFilterInputChange={onFilterInputChange}
          filterInputs={filterInputs}
          isContactDeleting={isContactDeleting}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          makeCall={makeCall}
          isCallMaking={isCallMaking}
          callId={callId}
        />
        <ContactList rows={contacts ?? []} isLoading={isLoading}
          search={search}
          handleSearch={debouncedSearch}
          totalRows={totalRows}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onEditRow={(row) => {
            onEditRow(row);
          }}
          onDelete={(row) => {
            onDelete(row);
          }}
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          makeCall={makeCall}
          isCallMaking={isCallMaking}
          callId={callId}
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

          <Box sx={dropzoneStyle}>
            {contactsFile ?
              <Box>
                <Typography variant="h6" component="div" gutterBottom>
                  File Selected: {contactsFile?.name}
                </Typography>
                <IconButton
                  color="primary"
                  onClick={() => {
                    setContactsFile(null)
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

          <Box sx={{
            my: 8
          }}>
            <AttributeSelector
              contactAttributes={contactAttributes}
              attributes={attributes}
              handleAttributeChange={handleAttributeChange}
              removeButtonHandler={removeButtonHandler}
              addButtonHandler={addButtonHandler}
            />
          </Box>
          <Box sx={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button size="sm"
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
                importContactsHandler()
              }}>
              Save
            </Button>
          </Box>
        </Grid2>
      </ResponsiveDrawer >
    </>
  );

}