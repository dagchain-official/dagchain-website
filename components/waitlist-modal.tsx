"use client"

import React, { useState, useEffect } from "react"
import { m, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
// import { supabase } from "@/lib/supabase" // SUPABASE - Uncomment to re-enable
import { countryCodes, getCountryByCode } from "@/lib/countryCodes"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    designation: "",
    city: "",
    note: "",
    termsAccepted: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null)

  // Auto-detect country code based on visitor's location
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        if (response.ok) {
          const data = await response.json()
          const country = getCountryByCode(data.country_code)
          if (country) {
            setFormData(prev => ({ ...prev, countryCode: country.code }))
            setDetectedCountry(country.country)
          }
        }
      } catch (error) {
        console.log('Could not detect country')
      }
    }
    if (isOpen) {
      detectCountry()
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.termsAccepted) {
      alert("Please accept the terms and conditions")
      return
    }

    setIsSubmitting(true)

    try {
      // SUPABASE BACKUP - Uncomment to re-enable Supabase integration
      // const { error } = await supabase.from("waitlist").insert([
      //   {
      //     first_name: formData.firstName,
      //     last_name: formData.lastName,
      //     email: formData.email,
      //     country_code: formData.countryCode,
      //     phone: formData.phone,
      //     designation: formData.designation,
      //     city: formData.city,
      //     note: formData.note,
      //     terms_accepted: formData.termsAccepted,
      //   },
      // ])
      // if (error) throw error

      // TODO: Replace with your own backend API call
      console.log("Waitlist submission:", {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        country_code: formData.countryCode,
        phone: formData.phone,
        designation: formData.designation,
        city: formData.city,
        note: formData.note,
        terms_accepted: formData.termsAccepted,
      })

      setSubmitSuccess(true)
      setTimeout(() => {
        onClose()
        setSubmitSuccess(false)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "+91",
          phone: "",
          designation: "",
          city: "",
          note: "",
          termsAccepted: false,
        })
      }, 2000)
    } catch (error: any) {
      console.error("Error submitting waitlist:", error)
      alert("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-[20px_20px_60px_rgba(163,177,198,0.5),-20px_-20px_60px_rgba(255,255,255,0.9)] border border-gray-200">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] transition-all"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Content */}
              <div className="p-6 md:p-10">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1e40af] to-[#a855f7] rounded-2xl flex items-center justify-center shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)]">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 11L12 14L22 4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  APPLY FOR THE
                </h2>
                <h3 className="text-center text-2xl md:text-3xl font-black mb-2">
                  <span className="bg-gradient-to-r from-[#a855f7] to-[#3b82f6] bg-clip-text text-transparent font-nasalization">
                    DAGARMY
                  </span>{" "}
                  <span className="text-[#1e40af] font-nasalization">Wishlist</span>
                </h3>
                <p className="text-center text-gray-600 text-sm mb-6">
                  Your opportunity to help shape the DAGChain Revolution.
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="h-1 w-12 bg-[#1e40af] rounded-full shadow-[2px_2px_4px_rgba(163,177,198,0.4),-2px_-2px_4px_rgba(255,255,255,0.9)]"></div>
                  <div className="h-1 w-12 bg-gray-300 rounded-full shadow-[2px_2px_4px_rgba(163,177,198,0.4),-2px_-2px_4px_rgba(255,255,255,0.9)]"></div>
                </div>

                {/* Form */}
                {submitSuccess ? (
                  <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)]">
                      <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      Successfully Submitted!
                    </h4>
                    <p className="text-gray-600">
                      Thank you for joining the waitlist. We'll be in touch soon!
                    </p>
                  </m.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Enter First Name"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 text-sm bg-white rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all text-gray-900 placeholder:text-gray-400 border-none focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Enter Last Name"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 text-sm bg-white rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all text-gray-900 placeholder:text-gray-400 border-none focus:outline-none"
                      />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 text-sm bg-white rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all text-gray-900 placeholder:text-gray-400 border-none focus:outline-none"
                      />
                      <div className="flex gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) =>
                            setFormData({ ...formData, countryCode: e.target.value })
                          }
                          className="w-32 px-2 py-3 text-xs bg-white rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all text-gray-900 cursor-pointer border-none focus:outline-none"
                          title={detectedCountry ? `Detected: ${detectedCountry}` : 'Select country code'}
                        >
                          {countryCodes.map((country) => (
                            <option key={country.iso} value={country.code}>
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          placeholder="Enter Phone #"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                          className="flex-1 px-4 py-3 text-sm bg-white rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all text-gray-900 placeholder:text-gray-400 border-none focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Designation & City */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Enter Designation"
                        value={formData.designation}
                        onChange={(e) =>
                          setFormData({ ...formData, designation: e.target.value })
                        }
                        className="w-full px-4 py-3 text-sm bg-white rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all text-gray-900 placeholder:text-gray-400 border-none focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Enter City (optional)"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="w-full px-4 py-3 text-sm bg-white rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all text-gray-900 placeholder:text-gray-400 border-none focus:outline-none"
                      />
                    </div>

                    {/* Note */}
                    <textarea
                      placeholder="Enter Short Note (Tell us what drives you to be part of DagArmy)"
                      value={formData.note}
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-3 text-sm bg-white rounded-xl shadow-[inset_4px_4px_8px_rgba(163,177,198,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] focus:shadow-[inset_6px_6px_12px_rgba(163,177,198,0.4),inset_-6px_-6px_12px_rgba(255,255,255,0.9)] transition-all text-gray-900 placeholder:text-gray-400 resize-none border-none focus:outline-none"
                    />

                    {/* Terms Checkbox */}
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={formData.termsAccepted}
                        onChange={(e) =>
                          setFormData({ ...formData, termsAccepted: e.target.checked })
                        }
                        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                        I agree that DAGChain may contact me by phone or email regarding my DagArmy
                        application and updates. I confirm that I have read and accepted the{" "}
                        <a
                          href="/terms"
                          target="_blank"
                          className="text-[#1e40af] hover:underline font-medium"
                        >
                          Terms & Conditions.
                        </a>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 px-8 py-3.5 bg-[#1e40af] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.1)] text-white font-nasalization text-base rounded-xl shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Apply Now"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}
