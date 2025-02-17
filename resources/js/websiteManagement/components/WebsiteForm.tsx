import React from 'react';
import { Website } from './WebsiteTable';

interface WebsiteFormProps {
  website: Website;
  onChange: (updatedWebsite: Website) => void;
}

const WebsiteForm: React.FC<WebsiteFormProps> = ({ website, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Website</label>
        <input
          type="text"
          value={website.name}
          onChange={(e) => onChange({ ...website, name: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">URL</label>
        <input
          type="url"
          value={website.url}
          onChange={(e) => onChange({ ...website, url: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded p-2"
          required
        />
      </div>
    </div>
  );
};

export default WebsiteForm;
