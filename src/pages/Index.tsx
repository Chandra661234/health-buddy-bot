import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { Activity } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Medical Help Assistant. I can help you with general health information, symptoms guidance, and first-aid instructions. How can I assist you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (message: string) => {
    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const response = generateMedicalResponse(message);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMedicalResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Simple pattern matching for demo purposes
    if (lowerQuery.includes("headache")) {
      return "For a simple headache:\n\n• Drink plenty of water\n• Rest in a quiet, dark room\n• Apply a cold compress\n• Take over-the-counter pain relief if needed\n\n⚠️ If headache is severe, sudden, or accompanied by fever, confusion, or vision changes, seek immediate medical attention.";
    } else if (lowerQuery.includes("fever")) {
      return "For fever management:\n\n• Stay hydrated\n• Rest adequately\n• Use fever-reducing medication as directed\n• Keep room temperature comfortable\n\n⚠️ Seek medical attention if:\n- Fever above 103°F (39.4°C)\n- Lasts more than 3 days\n- Accompanied by severe symptoms";
    } else if (lowerQuery.includes("burn")) {
      return "First aid for minor burns:\n\n1. Cool the burn under running water for 10-20 minutes\n2. Remove jewelry/tight items before swelling\n3. Apply aloe vera or moisturizing lotion\n4. Cover with sterile gauze\n5. Take pain relievers if needed\n\n⚠️ Seek immediate medical help for:\n- Burns larger than 3 inches\n- Deep burns\n- Burns on face, hands, feet, or joints\n- Chemical or electrical burns";
    } else if (lowerQuery.includes("emergency") || lowerQuery.includes("serious")) {
      return "🚨 For medical emergencies:\n\n• Call emergency services (911 or local emergency number)\n• Don't delay seeking help\n• Stay calm and follow dispatcher instructions\n\nEmergency signs include:\n- Difficulty breathing\n- Chest pain\n- Severe bleeding\n- Loss of consciousness\n- Severe allergic reactions\n- Stroke symptoms";
    } else if (lowerQuery.includes("doctor") || lowerQuery.includes("when to see")) {
      return "You should see a doctor if you experience:\n\n• Persistent symptoms lasting more than a few days\n• Worsening symptoms\n• High fever (above 103°F/39.4°C)\n• Severe pain\n• Unusual symptoms you're concerned about\n• Any symptom that interferes with daily activities\n\n💡 When in doubt, it's always better to consult a healthcare professional.";
    } else {
      return "I can help with general health information, but I need a bit more detail. Could you describe:\n\n• Your specific symptoms\n• How long you've had them\n• Any other relevant information\n\nRemember: For accurate diagnosis and treatment, always consult a licensed healthcare provider. This chatbot provides educational information only.";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-4 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Medical Help Assistant</h1>
            <p className="text-xs text-primary-foreground/80">AI-Powered Health Guidance</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          <MedicalDisclaimer />
          {messages.map((message, index) => (
            <ChatMessage key={index} role={message.role} content={message.content} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  );
};

export default Index;
