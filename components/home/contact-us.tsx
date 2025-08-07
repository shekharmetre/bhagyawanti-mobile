import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-r from-[#f9fafb] to-[#e0e7ff] py-20 dark:from-gray-900 dark:to-gray-800 lg:py-[120px]">
      <div className="container mx-auto px-4">
        <div className="-mx-4 flex flex-wrap lg:justify-between">
          {/* LEFT CONTENT */}
          <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
            <div className="mb-12 max-w-[570px] lg:mb-0">
              <span className="mb-4 block text-base font-semibold text-primary">
                Contact Us
              </span>
              <h2 className="mb-6 text-[32px] font-bold uppercase text-dark dark:text-white sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                GET IN TOUCH WITH US
              </h2>
              <p className="mb-9 text-base leading-relaxed text-body-color dark:text-dark-6">
                Have questions or need help? Reach out to your local retailer.
                We’re here to support you!
              </p>

              {/* Contact Info Boxes */}
              <ContactInfo
                image="/contact-us/first.svg"
                title="Our Location"
                description="99 S.t Jomblo Park Pekanbaru 28292. Indonesia"
              />
              <ContactInfo
                image="/contact-us/second.svg"
                title="Phone Number"
                description="(+62)81 414 257 9980"
              />
              <ContactInfo
                image="/contact-us/third.svg"
                title="Email Address"
                description="info@yourdomain.com"
              />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="relative rounded-2xl border border-white/30 bg-white/80 backdrop-blur-md p-8 shadow-xl dark:bg-white/5 sm:p-12">
              <h3 className="mb-8 text-2xl font-bold text-dark dark:text-white sm:text-3xl">
                Contact Retailer
              </h3>

              <form>
                <ContactInputBox type="text" name="name" placeholder="Your Name" />
                <ContactInputBox type="email" name="email" placeholder="Your Email" />
                <ContactInputBox type="tel" name="phone" placeholder="Your Phone" />
                <ContactTextArea row={6} placeholder="Your Message" name="details" />

                <div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-primary to-purple-600 px-6 py-3 text-white font-semibold shadow-md transition hover:opacity-90"
                  >
                    Send Message
                  </button>
                </div>
              </form>

              {/* Decorative SVGs */}
              <span className="absolute -right-9 -top-10 z-[-1]">
                <Image src="/contact-us/fourth.svg" alt="decoration" width={100} height={100} />
              </span>
              <span className="absolute -right-10 top-[90px] z-[-1]">
                <Image src="/contact-us/fifth.svg" alt="decoration" width={100} height={100} />
              </span>
              <span className="absolute -bottom-7 -left-7 z-[-1]">
                <Image src="/contact-us/sixth.svg" alt="decoration" width={100} height={100} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

// =======================
// COMPONENTS
// =======================

const ContactInputBox = ({ type, placeholder, name }: { type: string; placeholder: string; name: string }) => (
  <div className="mb-6">
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className="w-full rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
    />
  </div>
);

const ContactTextArea = ({ row, placeholder, name }: { row: number; placeholder: string; name: string }) => (
  <div className="mb-6">
    <textarea
      rows={row}
      placeholder={placeholder}
      name={name}
      className="w-full resize-none rounded border border-stroke px-[14px] py-3 text-base text-body-color outline-none focus:border-primary dark:border-dark-3 dark:bg-dark dark:text-dark-6"
    />
  </div>
);

const ContactInfo = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => (
  <div className="mb-8 flex w-full max-w-[370px]">
    <div className="mr-6 flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded bg-primary/5 text-primary sm:h-[70px] sm:w-[70px]">
      <Image src={image} alt={title} width={40} height={40} />
    </div>
    <div className="w-full">
      <h4 className="mb-1 text-xl font-bold text-dark dark:text-white">{title}</h4>
      <p className="text-base text-body-color dark:text-dark-6">{description}</p>
    </div>
  </div>
);
