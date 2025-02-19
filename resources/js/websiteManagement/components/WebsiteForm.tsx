import React from "react";
import { Website } from "@/shared/contexts/WebsiteContext";

interface WebsiteFormProps {
  website: Website;
  onChange: (updatedWebsite: Website) => void;
}

export const WebsiteForm: React.FC<WebsiteFormProps> = ({ website, onChange }) => {
  return (
    <div className="space-y-4">
      <input
        type="hidden"
        value={website.user_id}
        onChange={(e) =>
          onChange({ ...website, user_id: Number(e.target.value) })
        }
        required
      />
      <div>
        <label className="block text-sm font-medium text-white">
          Nome do Website
        </label>
        <input
          type="text"
          value={website.name}
          onChange={(e) => onChange({ ...website, name: e.target.value })}
          className="mt-1 block w-full border border-gray-300 text-black rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">Domain</label>
        <input
          type="url"
          value={website.domain}
          onChange={(e) => onChange({ ...website, domain: e.target.value })}
          className="mt-1 block w-full border border-gray-300 text-black rounded p-2"
          required
        />
      </div>
    </div>
  );
};

