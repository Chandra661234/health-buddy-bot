import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const MedicalDisclaimer = () => {
  return (
    <Alert className="mb-4 border-accent/20 bg-accent/5">
      <AlertCircle className="h-4 w-4 text-accent" />
      <AlertDescription className="text-xs">
        <strong>Medical Disclaimer:</strong> This chatbot provides general health information only. 
        It is not a substitute for professional medical advice, diagnosis, or treatment. 
        Always consult a qualified healthcare provider for medical concerns.
      </AlertDescription>
    </Alert>
  );
};
