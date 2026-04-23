import React from "react";

const TermsConditions = () => {
  return (
    <section className="min-h-screen bg-gray-950 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="text-gray-400 text-center mb-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-gray-300 leading-relaxed">

          {/* INTRO */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              1. Introduction
            </h2>
            <p>
              Welcome to <strong>Technavyug</strong>. By using our platform, you
              agree to comply with these terms and conditions.
            </p>
          </div>

          {/* USE */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              2. Use of Platform
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must provide accurate information</li>
              <li>You agree not to misuse our services</li>
              <li>You are responsible for your account security</li>
            </ul>
          </div>

          {/* SERVICES */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              3. Services
            </h2>
            <p>
              We provide certificate verification, project showcasing, and
              related services. We may modify or discontinue services anytime.
            </p>
          </div>

          {/* PAYMENTS */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              4. Payments & Subscriptions
            </h2>
            <p>
              Some services may be paid. All payments are non-refundable unless
              stated otherwise.
            </p>
          </div>

          {/* LIMITATION */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              5. Limitation of Liability
            </h2>
            <p>
              We are not responsible for any direct or indirect damages arising
              from the use of our platform.
            </p>
          </div>

          {/* TERMINATION */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              6. Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate accounts that violate
              our policies.
            </p>
          </div>

          {/* CHANGES */}
          <div>
            <h2 className="text-xl font-semibold text-cyan-400 mb-2">
              7. Changes to Terms
            </h2>
            <p>
              These terms may be updated at any time. Continued use of the
              platform means you accept the changes.
            </p>
          </div>

          {/* CONTACT */}
          <div className="mt-10 p-5 bg-gray-800/50 rounded-xl border border-gray-700">
            <h2 className="text-lg font-semibold text-white mb-2">
              Contact Us
            </h2>
            <p>Email: support@technavyug.com</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TermsConditions;