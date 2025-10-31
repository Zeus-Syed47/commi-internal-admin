'use client'

import EditMessage from '@/components/edit/editMessage';
import MessageNode from '@/components/node/messageNode';
import { TemplateContext } from '@/context/templateContext';
import useStore from '@/store';
import { routes } from '@/utils/routes/localRoutes';
import { Check, ChevronLeft, Close } from '@mui/icons-material';
import { Breadcrumbs, Button, Grid, IconButton, Sheet, Step, StepButton, StepIndicator, Stepper, Typography, useTheme } from '@mui/joy';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useCallback, useContext } from 'react';
import SetupTemplate from '@/components/templates/SetupTemplate';



export default function CreateTemplate() {
  const steps = ['Set up template', 'Submit review'];
  const [activeStep, setActiveStep] = React.useState(1);
  const router = useRouter();
  const updateSelectedTemplate = useStore(state => state.updateSelectedTemplate)

  const { handleCreateTemplate, nodeValues, updateTemplateFields, resetTemplateFields, isMediaUploading,
    isSessionCreating, isMobile,
    isTemplateCreating, deleteTemplateHandler,
    selectedTemplate, isTemplateDeleting } = useContext(TemplateContext)

  const handleBackClick = useCallback(() => {
    if (activeStep === 1) {
      updateSelectedTemplate({})
      resetTemplateFields()
      router.push(routes.broadcast.home)
    }
    else {
      setActiveStep(1)
    }
  }, [activeStep, router, updateSelectedTemplate, resetTemplateFields])

  return (
    <>
      <Grid sx={{
        width: '100%', px: {
          sm: 8,
          xs: 1
        }, display: 'flex', flex: 1,
        flexDirection: {
          sm: 'row',
          xs: 'column'
        }, alignItems: 'center',
        pt: { xs: 'calc(12px + var(--Header-height))', sm: 2.5 },

      }}>

        <Grid sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          mr: {
            sm: 18,
            xs: 0
          },
          pb: { xs: 3 },
          gap: 2
        }}>
          <Button startDecorator={<ChevronLeft />} onClick={() => {
            handleBackClick();
          }}>
            Back
          </Button>
          <Typography level="h4">
            Create a news letter
          </Typography>
        </Grid>
        <Stepper sx={{
          width: {
            sm: '40%',
            xs: '80%',
          },
        }
        } >
          {
            steps.map((step, index) => (
              <Step
                orientation={isMobile ? "vertical" : "horizontal"}
                key={step}
                indicator={
                  <StepIndicator
                    variant={activeStep <= index ? 'soft' : 'solid'}
                    color={activeStep < index ? 'neutral' : 'primary'}
                  >
                    {activeStep <= index ? index + 1 : <Check />}
                  </StepIndicator>
                }
                sx={[
                  activeStep > index &&
                  index !== 2 && { '&::after': { bgcolor: 'primary.solidBg' } },
                ]}
              >
                <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
              </Step>
            ))
          }
        </Stepper>

      </Grid >
      <Grid container direction={'row'} wrap={'wrap'} sx={{
        overflowY: 'auto',
        // border: '1px solid black'
      }}>
        {activeStep == 1 ?
          <SetupTemplate
            setActiveStep={setActiveStep}
            nodeValues={nodeValues}
            updateTemplateFields={updateTemplateFields} />
          :

          isMobile ?
            <Grid sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              pt: 5,
            }}>
              <MessageNode nodeValues={nodeValues} />
              <EditMessage
                isCreateFlow={true}
                rootRootStyle={{
                  width: '95%',
                  alignItems: 'center',
                  p: {
                    sm: 4
                  },
                  pl: {
                    sm: 12
                  },
                  border: 0,
                  boxShadow: 0
                }}
                rootStyle={{
                  width: '100%',
                }}
                onClose={() => {
                  handleBackClick();
                }}
                handleCreateTemplate={handleCreateTemplate}
                isMediaUploading={isMediaUploading}
                isSessionCreating={isSessionCreating}
                isTemplateCreating={isTemplateCreating}
              />
            </Grid>
            :
            <>
              <Grid sx={{ width: '70%' }}>
                <EditMessage
                  isCreateFlow={true}
                  rootRootStyle={{
                    width: '95%',
                    alignItems: 'center',
                    p: 4,
                    pl: 12,
                    border: 0,
                    boxShadow: 0
                  }}
                  rootStyle={{
                    width: '100%',
                  }}
                  onClose={() => {
                    handleBackClick();
                  }}
                  handleCreateTemplate={handleCreateTemplate}
                  isMediaUploading={isMediaUploading}
                  isSessionCreating={isSessionCreating}
                  isTemplateCreating={isTemplateCreating}
                  selectedTemplate={selectedTemplate}
                  onDeleteTemplate={deleteTemplateHandler}
                  isTemplateDeleting={isTemplateDeleting}
                />
              </Grid>
              <Grid sx={{ width: '30%', pt: 5 }}>
                <MessageNode nodeValues={nodeValues} />
              </Grid>
            </>

        }
      </Grid >
    </>
  );
}