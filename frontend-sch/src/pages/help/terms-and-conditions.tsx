import RootNavbar from "@/components/shared/navbar/root-navbar";
import { Link } from "react-router-dom";
import { LivaLogo } from "@/assets/images";

export default function TermsAndConditions() {
  return (
    <section className="px-6 py-4 space-y-5 w-full">
      {/* Navbar */}
      <RootNavbar Logo={LivaLogo} className="p-3" />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-6">
          Welcome to our School Management System. These Terms and Conditions
          govern your use of our application. By accessing or using the
          application, you agree to comply with and be bound by these terms. If
          you do not agree, please refrain from using our services.
        </p>

        <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By using our application, you affirm that you are at least 18 years
          old or have received parental or guardian consent to use the service.
          You agree to abide by all applicable laws and regulations.
        </p>

        <h2 className="text-2xl font-semibold mb-3">2. User Accounts</h2>
        <p className="mb-4">
          To access certain features of the application, you may need to
          register for an account. You are responsible for maintaining the
          confidentiality of your account credentials and for all activities
          that occur under your account.
        </p>

        <h2 className="text-2xl font-semibold mb-3">3. Use of the System</h2>
        <p className="mb-4">
          You agree to use the School Management System only for its intended
          purposes. You are prohibited from:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Uploading or sharing unlawful, harmful, or offensive content.</li>
          <li>
            Attempting to breach the application’s security or disrupt its
            operation.
          </li>
          <li>
            Impersonating other users or misrepresenting your affiliation.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">4. Data Privacy</h2>
        <p className="mb-4">
          Your data privacy is important to us. We handle your information in
          accordance with our{" "}
          <a href="/privacy-policy" className="text-blue-500 underline">
            Privacy Policy
          </a>
          . By using our application, you consent to our data practices.
        </p>

        <h2 className="text-2xl font-semibold mb-3">
          5. Intellectual Property
        </h2>
        <p className="mb-4">
          All content, trademarks, and intellectual property associated with the
          School Management System are the sole property of the application
          owner. Unauthorized reproduction, distribution, or modification is
          strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold mb-3">
          6. Disclaimer of Warranties
        </h2>
        <p className="mb-4">
          The application is provided "as is" and "as available." We make no
          warranties, express or implied, regarding the application’s
          functionality, reliability, or availability.
        </p>

        <h2 className="text-2xl font-semibold mb-3">
          7. Limitation of Liability
        </h2>
        <p className="mb-4">
          To the fullest extent permitted by law, we shall not be liable for any
          indirect, incidental, or consequential damages arising from your use
          of the application.
        </p>

        <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to update these Terms and Conditions at any time.
          Changes will be communicated through the application or our website.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="mb-4">
          <strong>Gree Software Solutions</strong>
          <br />
          Email:{" "}
          <Link
            to="mailto:greesoftwareacademycontact@gmail.com"
            className="hover:text-primary hover:underline"
            target="_blank"
          >
            greesoftwareacademycontact@gmail.com
          </Link>
          <br />
          Phone:
          <Link
            to="tel:+233597812947"
            className="hover:text-primary hover:underline"
          >
            +233 (59)781-2947
          </Link>
        </p>

        <p className="text-sm text-gray-500 mt-10">
          Last updated:
          <time dateTime="2022-02-22"> 8th September 2024</time>
        </p>
      </div>
    </section>
  );
}
