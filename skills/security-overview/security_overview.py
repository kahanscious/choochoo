def check_compliance_requirements(self):
        """Check compliance requirements."""
        print("### Compliance Requirements Analysis")
        
        if self.compliance == "soc2":
            self.find_soc2_compliance()
        elif self.compliance == "iso27001":
            self.find_iso27001_compliance()
        elif self.compliance == "gdpr":
            self.find_gdpr_compliance()
        elif self.compliance == "hipaa":
            self.find_hipaa_compliance()
        
        print("✓ Compliance requirements analysis complete")