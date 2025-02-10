import React from 'react'
import { MdLocalShipping } from 'react-icons/md'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {RiBankFill} from 'react-icons/ri'
import { Step, StepLabel, Stepper } from '@mui/material'

const CheckOut = ({activeStep}) => {

     
    const steps = [
        {
          label: <p>Shipping Details</p>,
          icon: <MdLocalShipping size={24}/>
        },
        {
          label: <p>Confirm Order</p>,
          icon: <BsFillCheckCircleFill size={21}/>
        },
        {
          label: <p>Payment</p>,
          icon: <RiBankFill size={24}/>
        },
      ]
    const stepStyles = {
        boxSizing: "border-box",
      }
  return (
   <>
    <Stepper alternativeLabel  activeStep={activeStep} style={stepStyles}  >
      
    {steps.map((item, index)=>(
            <Step  key={index}  active={activeStep === index ? true : false } 
            completed={activeStep >= index ? true : false} >
              <StepLabel  style={{
                color: activeStep >= index ? "blue" : "rgba(0, 0, 0, 0.649)",
              }} icon={item.icon}>{item.label}</StepLabel>
              
            </Step>
          ))

          }
    </Stepper>
   </>
  )
}

export default CheckOut