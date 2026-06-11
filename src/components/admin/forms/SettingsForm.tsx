"use client";

import { useState } from "react";
import { updateSettings } from "@/features/settings/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export function SettingsForm({ initialData }: { initialData: Record<string, string> }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    const res = await updateSettings(formData);
    setIsSubmitting(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Settings updated successfully");
    }
  }

  return (
    <form action={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="CONTACT_PHONE">Support Phone Number</Label>
              <Input id="CONTACT_PHONE" name="CONTACT_PHONE" defaultValue={initialData.CONTACT_PHONE} placeholder="+91 63694 58303" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="WHATSAPP_NUMBER">WhatsApp Order Number</Label>
              <Input id="WHATSAPP_NUMBER" name="WHATSAPP_NUMBER" defaultValue={initialData.WHATSAPP_NUMBER} placeholder="916369458303" />
              <p className="text-xs text-muted-foreground">Include country code without '+' (e.g., 916369458303)</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="CONTACT_EMAIL">Support Email</Label>
            <Input id="CONTACT_EMAIL" name="CONTACT_EMAIL" type="email" defaultValue={initialData.CONTACT_EMAIL} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ADDRESS">Store Address</Label>
            <Textarea id="ADDRESS" name="ADDRESS" defaultValue={initialData.ADDRESS} rows={3} />
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
