import React, { useState, useEffect } from 'react';
import { Download, Upload, CheckCircle, AlertCircle, FileSpreadsheet } from 'lucide-react';

const MetricsForm = () => {
  const [formData, setFormData] = useState({
    gpName: 'BlackRock',
    projectName: '',
    date: '',
    techType: '',
    asset: '',
    location: '',
    plannedCapacityMW: '',
    actualCapacityMW: '',
    plannedEnergyMWh: '',
    actualEnergyMWh: '',
    capacityFactor: '',
    availability: '',
    generationEfficiency: '',
    scheduledDowntime: '',
    unscheduledDowntime: '',
    downtimeReasons: '',
    plannedMaintenance: '',
    unexpectedMaintenance: '',
    comments: '',
    compensatedCurtailment: '',
    uncompensatedCurtailment: '',
    unavailabilityRate: '',
    weatherImpact: '',
    performanceVariance: '',
    technology: '',
    totalExtentAcres: '',
    degradationRate: '',
    storageUtilizationMWh: '',
    scope1Emissions: '',
    scope2Emissions: '',
    scope3Emissions: '',
    scope3Categories: '',
    emissionsComments: '',
    emissionTargets: '',
    targetStatus: '',
    targetDeviation: '',
    waterConsumption: '',
    waterConservation: '',
    biodiversityAssessment: '',
    jobsCreated: '',
    severeInjuryRate: ''
  });

  const [records, setRecords] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [apiUrl] = useState('http://localhost:5000');

  const gpOptions = ['BlackRock', 'Brookfield', 'TPG'];

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/records`);
      const data = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.projectName || !formData.date || !formData.techType || 
        !formData.asset || !formData.location) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please fill in all required fields' 
      });
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ 
          type: 'success', 
          message: `Metrics submitted to ${formData.gpName} sheet!` 
        });
        
        const currentGP = formData.gpName;
        setFormData({
          gpName: currentGP,
          projectName: '', date: '', techType: '', asset: '', location: '',
          plannedCapacityMW: '', actualCapacityMW: '', plannedEnergyMWh: '', 
          actualEnergyMWh: '', capacityFactor: '', availability: '', 
          generationEfficiency: '', scheduledDowntime: '', unscheduledDowntime: '',
          downtimeReasons: '', plannedMaintenance: '', unexpectedMaintenance: '',
          comments: '', compensatedCurtailment: '', uncompensatedCurtailment: '',
          unavailabilityRate: '', weatherImpact: '', performanceVariance: '',
          technology: '', totalExtentAcres: '', degradationRate: '',
          storageUtilizationMWh: '', scope1Emissions: '', scope2Emissions: '',
          scope3Emissions: '', scope3Categories: '', emissionsComments: '',
          emissionTargets: '', targetStatus: '', targetDeviation: '',
          waterConsumption: '', waterConservation: '', biodiversityAssessment: '',
          jobsCreated: '', severeInjuryRate: ''
        });

        fetchRecords();
      } else {
        setSubmitStatus({ type: 'error', message: 'Submission failed' });
      }

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Connection error' });
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleDownload = () => {
    window.open(`${apiUrl}/api/download`, '_blank');
  };

  const sections = [
    {
      title: 'GP Selection',
      fields: [
        { name: 'gpName', label: 'GP Name', type: 'select', options: gpOptions, required: true }
      ]
    },
    {
      title: 'Project Information',
      fields: [
        { name: 'projectName', label: 'Project Name', type: 'text', required: true },
        { name: 'date', label: 'Date', type: 'date', required: true },
        { name: 'techType', label: 'Tech Type', type: 'text', required: true },
        { name: 'asset', label: 'Asset', type: 'text', required: true },
        { name: 'location', label: 'Location', type: 'text', required: true }
      ]
    },
    {
      title: 'Energy Capacity & Generation',
      fields: [
        { name: 'plannedCapacityMW', label: 'Planned Capacity (MW)', type: 'number' },
        { name: 'actualCapacityMW', label: 'Actual Capacity (MW)', type: 'number' },
        { name: 'plannedEnergyMWh', label: 'Planned Energy (MWh)', type: 'number' },
        { name: 'actualEnergyMWh', label: 'Actual Energy (MWh)', type: 'number' }
      ]
    },
    {
      title: 'Performance Metrics',
      fields: [
        { name: 'capacityFactor', label: 'Capacity Factor (%)', type: 'number' },
        { name: 'availability', label: 'Availability (%)', type: 'number' },
        { name: 'generationEfficiency', label: 'Generation Efficiency (%)', type: 'number' },
        { name: 'unavailabilityRate', label: 'Unavailability Rate (%)', type: 'number' }
      ]
    },
    {
      title: 'Downtime & Maintenance',
      fields: [
        { name: 'scheduledDowntime', label: 'Scheduled Downtime (hrs)', type: 'number' },
        { name: 'unscheduledDowntime', label: 'Unscheduled Downtime (hrs)', type: 'number' },
        { name: 'downtimeReasons', label: 'Downtime Reasons', type: 'textarea' },
        { name: 'plannedMaintenance', label: 'Planned Maintenance', type: 'textarea' },
        { name: 'unexpectedMaintenance', label: 'Unexpected Maintenance', type: 'textarea' }
      ]
    },
    {
      title: 'Curtailment',
      fields: [
        { name: 'compensatedCurtailment', label: 'Compensated Curtailment (MWh)', type: 'number' },
        { name: 'uncompensatedCurtailment', label: 'Uncompensated Curtailment (MWh)', type: 'number' }
      ]
    },
    {
      title: 'Weather & Performance',
      fields: [
        { name: 'weatherImpact', label: 'Weather Impact', type: 'textarea' },
        { name: 'performanceVariance', label: 'Performance Variance', type: 'textarea' }
      ]
    },
    {
      title: 'Technology',
      fields: [
        { name: 'technology', label: 'Technology', type: 'text' },
        { name: 'totalExtentAcres', label: 'Total Extent (acres)', type: 'number' },
        { name: 'degradationRate', label: 'Degradation Rate (%)', type: 'number' },
        { name: 'storageUtilizationMWh', label: 'Storage Utilization (MWh)', type: 'number' }
      ]
    },
    {
      title: 'GHG Emissions',
      fields: [
        { name: 'scope1Emissions', label: 'Scope 1 (CO2e)', type: 'number' },
        { name: 'scope2Emissions', label: 'Scope 2 (CO2e)', type: 'number' },
        { name: 'scope3Emissions', label: 'Scope 3 (CO2e)', type: 'number' },
        { name: 'scope3Categories', label: 'Scope 3 Categories', type: 'textarea' },
        { name: 'emissionsComments', label: 'Emissions Comments', type: 'textarea' }
      ]
    },
    {
      title: 'Targets',
      fields: [
        { name: 'emissionTargets', label: 'Emission Targets', type: 'textarea' },
        { name: 'targetStatus', label: 'Target Status', type: 'text' },
        { name: 'targetDeviation', label: 'Target Deviation', type: 'textarea' }
      ]
    },
    {
      title: 'Water',
      fields: [
        { name: 'waterConsumption', label: 'Water Consumption (L)', type: 'number' },
        { name: 'waterConservation', label: 'Conservation Measures', type: 'textarea' }
      ]
    },
    {
      title: 'Social Impact',
      fields: [
        { name: 'biodiversityAssessment', label: 'Biodiversity Assessment', type: 'textarea' },
        { name: 'jobsCreated', label: 'Jobs Created', type: 'number' },
        { name: 'severeInjuryRate', label: 'Injury Rate', type: 'number' }
      ]
    },
    {
      title: 'Comments',
      fields: [
        { name: 'comments', label: 'General Comments', type: 'textarea' }
      ]
    }
  ];

  const totalRecords = Object.values(records).reduce((sum, arr) => sum + (arr?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">GP Metrics Tracker</h1>
              <p className="text-gray-600 mt-2">Energy & Sustainability Data</p>
            </div>
            {totalRecords > 0 && (
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                <FileSpreadsheet size={20} />
                Download Excel ({totalRecords})
              </button>
            )}
          </div>

          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
              submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {submitStatus.type === 'success' ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
              <span className="font-medium">{submitStatus.message}</span>
            </div>
          )}

          <div className="space-y-8">
            {sections.map((section, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">{section.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.fields.map((field) => (
                    <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {field.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          step={field.type === 'number' ? '0.01' : undefined}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <Upload size={20} />
              Submit Metrics
            </button>
          </div>
        </div>

        {Object.keys(records).some(gp => records[gp]?.length > 0) && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Submitted Records</h2>
            {gpOptions.map(gp => (
              records[gp]?.length > 0 && (
                <div key={gp} className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {gp} - {records[gp].length} records
                    </span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Date</th>
                          <th className="px-4 py-2 text-left">Project</th>
                          <th className="px-4 py-2 text-left">Location</th>
                          <th className="px-4 py-2 text-left">Tech</th>
                          <th className="px-4 py-2 text-left">Capacity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {records[gp].map((record, idx) => (
                          <tr key={idx} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2">{record.date}</td>
                            <td className="px-4 py-2">{record.projectName}</td>
                            <td className="px-4 py-2">{record.location}</td>
                            <td className="px-4 py-2">{record.techType}</td>
                            <td className="px-4 py-2">{record.actualCapacityMW}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsForm;