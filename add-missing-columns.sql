-- Add missing columns to homepage_contact_section
ALTER TABLE `homepage_contact_section` 
  ADD COLUMN `phone_placeholder` VARCHAR(100) NULL AFTER `email_placeholder`,
  ADD COLUMN `service_placeholder` VARCHAR(100) NOT NULL DEFAULT 'Select a service' AFTER `phone_placeholder`;

-- Update company_placeholder to phone_placeholder (if company_placeholder exists)
-- First add phone_placeholder with company data, then drop company_placeholder
UPDATE `homepage_contact_section` 
SET `phone_placeholder` = `company_placeholder` 
WHERE `phone_placeholder` IS NULL AND `company_placeholder` IS NOT NULL;

ALTER TABLE `homepage_contact_section` 
  DROP COLUMN IF EXISTS `company_placeholder`;

-- Add service_placeholder to contact_page_form_config
ALTER TABLE `contact_page_form_config` 
  ADD COLUMN IF NOT EXISTS `service_placeholder` VARCHAR(100) NOT NULL DEFAULT 'Select a service' AFTER `subject_placeholder`;

-- Add service column to contact_form_submissions
ALTER TABLE `contact_form_submissions` 
  ADD COLUMN IF NOT EXISTS `service` VARCHAR(256) NULL AFTER `subject`;
