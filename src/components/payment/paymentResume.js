import { Step, Stepper, Typography } from "@material-tailwind/react";
import { Button } from "flowbite-react";
import { useState } from "react";
import Order from "../order/order";
import {
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
    ReceiptPercentIcon,
    CreditCardIcon,
    CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import PaymentGateway from "../paymentGateway/paymentgateway";
import Summary from "../summary/summary";

export default function Payment() {

    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

    const steps = () => {
        switch (activeStep) {
            case 0:
                return <Order handleClick={handleNext}/>
            case 1:
                return <PaymentGateway handleClick={handleNext}/>
            case 2:
                return <Summary />
            default:
                return <Order />
        }
    }

    return (
        <>
            <div className="w-full py-4 px-36">
                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                >
                    <Step onClick={() => setActiveStep(0)}>
                        <ReceiptPercentIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center text-black ">
                            <Typography
                                variant="h6"
                                color={activeStep === 0 ? "blue-gray" : "gray"}
                            >
                                Order Details
                            </Typography>
                            <Typography
                                color={activeStep === 0 ? "blue-gray" : "gray"}
                                className="font-normal"
                            >
                                This are the details of your order
                            </Typography>
                        </div>
                    </Step>
                    <Step onClick={() => setActiveStep(1)}>
                    <CreditCardIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center text-black ">
                            <Typography
                                variant="h6"
                                color={activeStep === 0 ? "blue-gray" : "gray"}
                            >
                                Payment Details
                            </Typography>
                            <Typography
                                color={activeStep === 0 ? "blue-gray" : "gray"}
                                className="font-normal"
                            >
                                This are your payment details
                            </Typography>
                        </div>
                    </Step>
                    <Step>
                    <CheckBadgeIcon className="h-5 w-5" />
                        <div className="absolute -bottom-[4.5rem] w-max text-center text-black ">
                            <Typography
                                variant="h6"
                                color={activeStep === 0 ? "blue-gray" : "gray"}
                            >
                                Finish Order
                            </Typography>
                            <Typography
                                color={activeStep === 0 ? "blue-gray" : "gray"}
                                className="font-normal"
                            >
                                Finish your order
                            </Typography>
                        </div>
                    </Step>
                </Stepper>
                {/* <div className="mt-16 flex justify-between">
                    <Button onClick={handlePrev} disabled={isFirstStep}>
                        Prev
                    </Button>
                    <Button onClick={handleNext} disabled={isLastStep}>
                        Next
                    </Button>
                </div> */}
                <div className="mt-16 flex justify-center">
                    {steps()} 
                </div>
            </div>

        </>
    );

}
