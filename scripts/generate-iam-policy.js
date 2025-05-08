// @ts-nocheck
/* eslint-disable */
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

// Read serverless.yml
const serverlessConfig = yaml.load(fs.readFileSync('serverless.yml', 'utf8'));

// Get service name and region from serverless.yml
const serviceName = serverlessConfig.service;
const region = serverlessConfig.provider.region;

// Read template policy from scripts directory
const templatePath = path.join(__dirname, 'pesmission.json');
const templatePolicy = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

// Replace placeholders in the template
const replacePlaceholders = obj => {
  if (typeof obj === 'string') {
    return obj
      .replace(/<SERVICE_NAME>/g, serviceName)
      .replace(/<AWS_ACCOUNT_ID>/g, '*')
      .replace(/<AWS_REGION>/g, region);
  }
  if (Array.isArray(obj)) {
    return obj.map(replacePlaceholders);
  }
  if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = replacePlaceholders(obj[key]);
    }
    return newObj;
  }
  return obj;
};

// Generate final policy
const finalPolicy = replacePlaceholders(templatePolicy);

// Write the policy to a file
fs.writeFileSync('pesmission.json', JSON.stringify(finalPolicy, null, 2));

console.log('IAM policy has been generated successfully!');
