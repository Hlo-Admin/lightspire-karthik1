import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ScheduleCallFormProps {
  children: React.ReactNode;
}

const ScheduleCallForm = ({ children }: ScheduleCallFormProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectDetails: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      toast.error('Please select both date and time for the call.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('scheduled_calls')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || null,
          project_details: formData.projectDetails || null,
          scheduled_date: format(date, 'yyyy-MM-dd'),
          scheduled_time: time,
          timezone: 'IST'
        });

      if (error) {
        console.error('Error scheduling call:', error);
        toast.error('Failed to schedule call. Please try again.');
      } else {
        // Send email notification
        try {
          const { error: emailError } = await supabase.functions.invoke('send-notification-email', {
            body: {
              type: 'schedule',
              data: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                project_details: formData.projectDetails,
                scheduled_date: format(date, 'yyyy-MM-dd'),
                scheduled_time: time,
                timezone: 'IST'
              }
            }
          });

          if (emailError) {
            console.error('Error sending email notification:', emailError);
            // Don't fail the entire submission if email fails
          }
        } catch (emailError) {
          console.error('Email notification error:', emailError);
          // Don't fail the entire submission if email fails
        }

        toast.success(`Call scheduled successfully for ${format(date, "PPP")} at ${time} IST!`);
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          projectDetails: "",
        });
        setDate(undefined);
        setTime("");
        setOpen(false);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate time slots for IST (9 AM to 6 PM)
  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0678cf]">
            Schedule a Call
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-[#0678cf]"
              >
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 border-[#0678cf] focus:ring-[#0678cf]"
                placeholder="Your full name"
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-[#0678cf]"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 border-[#0678cf] focus:ring-[#0678cf]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label
                htmlFor="phone"
                className="text-sm font-semibold text-[#0678cf]"
              >
                Phone Number *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="mt-1 border-[#0678cf] focus:ring-[#0678cf]"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <Label
                htmlFor="company"
                className="text-sm font-semibold text-[#0678cf]"
              >
                Company Name
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="mt-1 border-[#0678cf] focus:ring-[#0678cf]"
                placeholder="Your company"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold text-[#0678cf]">
                Select Date *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1 border-[#0678cf]",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date < new Date() ||
                      date.getDay() === 0 ||
                      date.getDay() === 6
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-sm font-semibold text-[#0678cf]">
                Select Time (IST) *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1 border-[#0678cf]",
                      !time && "text-muted-foreground"
                    )}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {time ? `${time} IST` : "Select time"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="grid grid-cols-3 gap-2 p-4 max-h-48 overflow-y-auto">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={time === slot ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTime(slot)}
                        className="text-xs"
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label
                htmlFor="projectDetails"
                className="text-sm font-semibold text-[#0678cf]"
              >
                Project Details
              </Label>
              <Input
                id="projectDetails"
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleInputChange}
                className="mt-1 border-[#0678cf] focus:ring-[#0678cf]"
                placeholder="Brief description of your project"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#0678cf] hover:bg-[#045a9e] text-white"
              disabled={
                isSubmitting ||
                !formData.name ||
                !formData.email ||
                !formData.phone ||
                !date ||
                !time
              }
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Scheduling...
                </div>
              ) : (
                'Schedule Call'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleCallForm;
