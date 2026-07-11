"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { EmailFrequency } from "@/lib/api/notifications";

import { useNotificationPreferences } from "../../../_hooks/use-notification-preferences";
import { useUpdateNotificationPreferences } from "../../../_hooks/use-update-notification-preferences";

const FREQUENCY_OPTIONS: { value: EmailFrequency; label: string }[] = [
  { value: "NEVER", label: "Never" },
  { value: "INSTANT", label: "Instantly" },
];

const NOTIFICATION_PREFERENCES = [
  {
    key: "commentsEnabled",
    label: "Comments",
    description: "New comments added on cards you're assigned to",
  },
  {
    key: "dueDatesEnabled",
    label: "Due dates",
    description: "Due dates are added, changed, or approaching on a card you're assigned to",
  },
  {
    key: "removedFromCardEnabled",
    label: "You're removed from a card",
    description: "Someone removes you as a member from a card",
  },
  {
    key: "attachmentsEnabled",
    label: "Attachments added",
    description: "Files or links added to cards you're assigned to",
  },
  {
    key: "cardsMovedEnabled",
    label: "Cards moved",
    description: "Cards you're assigned to are moved between lists or boards",
  },
] as const;

type PreferenceKey = (typeof NOTIFICATION_PREFERENCES)[number]["key"];

export function SettingsPageContent() {
  const { data } = useNotificationPreferences();
  const updatePreferences = useUpdateNotificationPreferences();

  const isReady = !!data;
  const isMutating = updatePreferences.isPending;
  const allSelected = data ? NOTIFICATION_PREFERENCES.every((p) => data[p.key]) : false;

  function handleFrequencyChange(value: EmailFrequency) {
    updatePreferences.mutate({ emailFrequency: value });
  }

  function toggleAll(checked: boolean) {
    const payload = Object.fromEntries(
      NOTIFICATION_PREFERENCES.map((p) => [p.key, checked]),
    ) as Record<PreferenceKey, boolean>;
    updatePreferences.mutate(payload);
  }

  function togglePreference(key: PreferenceKey, checked: boolean) {
    updatePreferences.mutate({ [key]: checked });
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-foreground">Settings</h1>

      <div className="">
        <h2 className="text-lg font-semibold text-foreground">Email notifications</h2>

        <div className="mt-5">
          <div className="text-sm font-semibold text-foreground">Frequency</div>
          <p className="mt-1 text-xs text-muted-foreground">
            Email notifications can be sent &lsquo;Instantly&rsquo; (as soon as they occur). If
            you&apos;d like to opt-out of all notification emails, set the frequency as
            &lsquo;Never&rsquo;.
          </p>
          <RadioGroup
            value={data?.emailFrequency ?? "INSTANT"}
            onValueChange={(value) => handleFrequencyChange(value as EmailFrequency)}
            className="mt-3 gap-2.5"
          >
            {FREQUENCY_OPTIONS.map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-2.5">
                <RadioGroupItem value={option.value} disabled={!isReady || isMutating} />
                <span className="text-[13.5px] text-foreground">{option.label}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        <div className="mt-6">
          <div className="text-sm font-semibold text-foreground">Email notification preferences</div>
          <p className="mt-1 text-xs text-muted-foreground">
            These preferences only apply to email notifications for cards you&apos;re assigned to.
            Select which notifications you&apos;d like to receive via email.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            You&apos;ll always get emails for invites, direct mentions, and more.
          </p>

          <div className="mt-4 flex flex-col gap-3.5">
            <label className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(v) => toggleAll(!!v)}
                disabled={!isReady || isMutating}
              />
              <span className="text-[13.5px] font-medium text-foreground">Select all</span>
            </label>

            {NOTIFICATION_PREFERENCES.map((preference) => (
              <label key={preference.key} className="flex cursor-pointer items-start gap-2.5">
                <Checkbox
                  checked={data ? data[preference.key] : false}
                  onCheckedChange={(v) => togglePreference(preference.key, !!v)}
                  disabled={!isReady || isMutating}
                  className="mt-0.5"
                />
                <span className="flex flex-col">
                  <span className="text-[13.5px] text-foreground">{preference.label}</span>
                  <span className="text-xs text-muted-foreground">{preference.description}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <Button type="button" variant="outline" size="sm" className="mt-6 cursor-pointer">
          Allow desktop notifications
        </Button>
      </div>
    </div>
  );
}
