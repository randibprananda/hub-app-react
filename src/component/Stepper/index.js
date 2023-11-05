import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

export default function VerticalLinearStepper({ activeStep, handleReset, steps }) {

    const ColorlibConnector = styled(StepConnector)(() => ({
        [`&.${stepConnectorClasses.lineVertical}`]: {
            top: 5,
            left: "calc(-50% + 7px)",
            right: "calc(50% + 7px)"
        },
    }));

    const ColorlibStepIconRoot = styled('div')(() => ({
        background: 'rgba(0, 205, 180, 0.2)',
        zIndex: 1,
        color: 'rgba(0, 205, 180, 1)',
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    }));

    function ColorlibStepIcon(props) {
        const { active, completed, className } = props;

        const icons = {
            1: '1',
            2: '2',
            3: '3',
        };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
                {completed ? <CheckIcon /> : icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    }
    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{
                "& .MuiStepConnector-vertical .MuiStepConnector-root .Mui-active .MuiStepConnector-lineVertical .Mui-disabled": {
                    marginLeft: "20px"
                }
            }}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                            StepIconComponent={ColorlibStepIcon}
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step?.description}</Typography>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {/* {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )} */}
        </Box>
    );
}
