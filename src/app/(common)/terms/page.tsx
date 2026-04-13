import React from "react";

export const metadata = {
  title: "Terms of Service | SkillBridge",
  description:
    "Terms and conditions for using the SkillBridge tutoring platform.",
};

export default function TermsOfService() {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-black/5">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
        <p className="text-base font-semibold leading-7 text-primary">
          Last Updated: March 2026
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Terms of Service
        </h1>
        <p className="mt-6 text-xl leading-8">
          Welcome to SkillBridge. By accessing or using our platform, you agree
          to be bound by these Terms of Service. Please read them carefully to
          understand your rights and responsibilities as a student or tutor.
        </p>

        <div className="mt-10 max-w-2xl">
          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            1. Marketplace Platform
          </h2>
          <p className="mt-4">
            SkillBridge provides a marketplace where students can connect with
            independent tutors. We do not employ tutors; they are independent
            contractors who set their own schedules and rates. While we verify
            profiles, we are not responsible for the specific teaching methods
            used during sessions.
          </p>

          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            2. Booking and Payments
          </h2>
          <p className="mt-4">
            All payments must be made through the SkillBridge platform.
            Attempting to bypass the platform to pay a tutor directly is a
            violation of our terms and may lead to account suspension. We charge
            a service fee to maintain the platform and process secure
            transactions.
          </p>

          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            3. Cancellation Policy
          </h2>
          <p className="mt-4">
            Users are expected to respect each other's time. Cancellations made
            within 24 hours of a scheduled session may be subject to a
            cancellation fee. Tutors who frequently cancel sessions may see
            their featured status or account visibility reduced.
          </p>

          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            4. User Conduct
          </h2>
          <p className="mt-4">
            You agree to use SkillBridge for lawful purposes only. Harassment,
            abuse, or discriminatory behavior toward any member of our community
            will result in immediate termination of access.
          </p>

          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            5. Limitation of Liability
          </h2>
          <p className="mt-4">
            To the maximum extent permitted by law, SkillBridge shall not be
            liable for any indirect, incidental, or consequential damages
            resulting from your use of the platform or the conduct of any tutor
            or student.
          </p>

          <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Contact Support
          </h2>
          <p className="mt-4">
            For questions regarding these terms or to report a violation of our
            community standards, please contact us at support@skillbridge.com.
          </p>
        </div>
      </div>
    </div>
  );
}
