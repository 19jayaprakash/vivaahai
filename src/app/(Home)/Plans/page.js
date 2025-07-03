'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { axiosPublic } from '../../base/constant';
 
const MatrimonyPaymentScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState("gold");
  const [selectedDuration, setSelectedDuration] = useState("3");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [razorpayData, setRazorpayData] = useState(null);
  const [planDetails, setPlanDetails] = useState({});
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
 
  const router = useRouter();
 
  // Static plan display data (for UI styling and emojis)
  const planDisplayData = {
    silver: {
      emoji: "👥",
      color: "blue",
      displayName: "Silver"
    },
    gold: {
      emoji: "⭐",
      color: "purple",
      popular: true,
      displayName: "Gold"
    },
    platinum: {
      emoji: "👑",
      color: "amber",
      displayName: "Platinum"
    },
  };
 
  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        setIsLoadingPlans(true);
        const res = await axiosPublic.get(`/subscription/get-subscription-plans`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
       
        if (res.status === 200) {
          setPlanDetails(res.data?.result);
          console.log(res.data?.result);
         
          // Set default selected plan to the first available plan
          const firstPlanKey = Object.keys(res.data?.result)[0];
          if (firstPlanKey) {
            setSelectedPlan(firstPlanKey);
          }
        }
      } catch (error) {
        console.error("Error fetching plan details:", error);
      } finally {
        setIsLoadingPlans(false);
      }
    };
 
    fetchPlanDetails();
  }, []);
 
  const getDiscountPercentage = (plan, duration) => {
    if (!planDetails[plan] || !planDetails[plan].price || !planDetails[plan].offerPrice) {
      return 0;
    }
   
    const originalPrice = planDetails[plan].price[duration];
    const offerPrice = planDetails[plan].offerPrice[duration];
   
    if (!originalPrice || !offerPrice) return 0;
   
    return Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
  };
 
  const handlePayment = async () => {
    setIsLoading(true);
    console.log("payment");
 
    try {
      const userId = localStorage.getItem("userId");
 
      const paymentData = {
        amount: planDetails[selectedPlan]?.offerPrice[selectedDuration],
        userId: Number(userId),
        durationInMonths: selectedDuration,
        planType: selectedPlan,
      };
 
      const res = await axiosPublic.post("/subscription/add-user-subscription", paymentData);
      if (res.data) {
        console.log(res.data);
        setRazorpayData({
          razorpayKey: res.data.razorpayKey,
          amount: res.data.amount,
          razorpayOrderId: res.data.razorpayOrderId,
          planName: planDisplayData[selectedPlan]?.displayName || planDetails[selectedPlan]?.name,
          duration: selectedDuration,
        });
        setShowRazorpayModal(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };
 
  const handleRazorpaySuccess = async (paymentResponse) => {
    setShowRazorpayModal(false);
 
    try {
      const userId = localStorage.getItem("userId");
      console.log("verify", {
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        plan_type: selectedPlan,
        user_id: Number(userId),
      });
 
      const verificationResult = await axiosPublic.post("/subscription/verify-payment",
        {
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          plan_type: selectedPlan,
          user_id: Number(userId),
        },
      );
 
      const verificationData = await verificationResult.json();
 
      if (verificationData.success) {
        router.push("/Home");
      } else {
        router.push("/Home");
      }
    } catch (verifyError) {
      console.error("Verification error:", verifyError);
      router.push("/Home");
    }
  };
 
  const handleRazorpayError = (error) => {
    setShowRazorpayModal(false);
    console.log("Payment error:", error);
 
    if (error.description?.includes("cancelled")) {
      alert("Payment was cancelled");
    } else {
      alert(`Payment failed: ${error.description || "Unknown error"}`);
    }
  };
 
  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
 
  const openRazorpay = () => {
    if (!razorpayData || !window.Razorpay) return;
 
    const options = {
      key: razorpayData.razorpayKey,
      amount: Math.round(razorpayData.amount * 100),
      currency: 'INR',
      order_id: razorpayData.razorpayOrderId,
      name: 'Matrimony App',
      description: `${razorpayData.planName} Plan - ${razorpayData.duration} Month${razorpayData.duration > 1 ? "s" : ""}`,
      handler: function (response) {
        handleRazorpaySuccess(response);
      },
      modal: {
        ondismiss: function() {
          handleRazorpayError({ description: "Payment cancelled by user" });
        }
      },
      theme: {
        color: '#8B5CF6'
      }
    };
 
    const rzp = new window.Razorpay(options);
    rzp.open();
 
    rzp.on('payment.failed', function (response) {
      handleRazorpayError(response.error);
    });
  };
 
  useEffect(() => {
    if (showRazorpayModal && razorpayData && window.Razorpay) {
      openRazorpay();
    }
  }, [showRazorpayModal, razorpayData]);
 
  const selectedPlanData = planDetails[selectedPlan];
  const selectedPlanDisplay = planDisplayData[selectedPlan];
 
  const getColorClasses = (color, isSelected) => {
    const colorMap = {
      blue: {
        border: isSelected ? 'border-blue-500' : 'border-gray-200',
        bg: isSelected ? 'bg-blue-50' : 'bg-white',
        text: 'text-blue-600',
        iconBg: 'bg-blue-100',
        shadow: isSelected ? 'shadow-blue-200' : 'shadow-gray-100'
      },
      purple: {
        border: isSelected ? 'border-purple-500' : 'border-gray-200',
        bg: isSelected ? 'bg-purple-50' : 'bg-white',
        text: 'text-purple-600',
        iconBg: 'bg-purple-100',
        shadow: isSelected ? 'shadow-purple-200' : 'shadow-gray-100'
      },
      amber: {
        border: isSelected ? 'border-amber-500' : 'border-gray-200',
        bg: isSelected ? 'bg-amber-50' : 'bg-white',
        text: 'text-amber-600',
        iconBg: 'bg-amber-100',
        shadow: isSelected ? 'shadow-amber-200' : 'shadow-gray-100'
      }
    };
    return colorMap[color] || colorMap.blue;
  };
 
  const PlanCard = ({ planKey, plan, displayData }) => {
    const isSelected = selectedPlan === planKey;
    const colors = getColorClasses(displayData.color, isSelected);
 
    return (
      <div
        className={`
          relative cursor-pointer transition-all duration-300 hover:scale-105
          ${isSelected ? 'scale-105' : 'scale-100'}
          ${colors.border} ${colors.bg}
          border-2 rounded-2xl p-4 flex flex-col
          min-w-[180px] max-w-[220px] w-full
          shadow-lg ${colors.shadow}
        `}
        onClick={() => setSelectedPlan(planKey)}
      >
        {displayData.popular && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-xl">
              <span className="text-white text-xs font-bold">Most Popular</span>
            </div>
          </div>
        )}
 
        <div className="flex flex-col items-center mb-4">
          <div className={`w-12 h-12 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-2`}>
            <span className="text-2xl">{displayData.emoji}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{displayData.displayName}</h3>
          <p className="text-xs text-gray-500 text-center mb-3">Perfect for serious seekers</p>
         
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
            ${isSelected ? `${colors.text.replace('text-', 'border-')} ${colors.text.replace('text-', 'bg-')}` : 'border-gray-300'}
          `}>
            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
          </div>
        </div>
 
        <div className="flex-1 space-y-2">
          {plan.features?.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start">
              <span className="text-green-500 mr-2 text-sm font-bold">✓</span>
              <span className="text-xs text-gray-600 leading-relaxed">{feature}</span>
            </div>
          ))}
          {plan.features?.length > 3 && (
            <p className="text-xs text-gray-500 text-center italic mt-2">
              +{plan.features.length - 3} more features
            </p>
          )}
        </div>
      </div>
    );
  };
 
  const DurationCard = ({ months, price, offer }) => {
    const isSelected = selectedDuration === months;
    const discount = getDiscountPercentage(selectedPlan, months);
 
    return (
      <div
        className={`
          flex justify-between items-center p-3 rounded-xl border-2 mb-3 cursor-pointer transition-all
          ${isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white hover:border-gray-300'}
        `}
        onClick={() => setSelectedDuration(months)}
      >
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center
            ${isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'}
          `}>
            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
          </div>
          <div>
            <span className="text-sm font-medium text-gray-900">
              {selectedPlan === 'platinum'
                ? "Till Marry"
                : `${months} Month${months > 1 ? "s" : ""}`}
            </span>
            {discount > 0 && (
              <div className="inline-block bg-green-100 px-2 py-0.5 rounded-lg ml-2">
                <span className="text-xs text-green-600 font-semibold">Save {discount}%</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 line-through">₹{price}</span>
            <span className="text-base font-bold text-gray-900">₹{offer}</span>
          </div>
          <span className="text-xs text-gray-500">
            ₹{Math.round(offer / months)}/month
          </span>
        </div>
      </div>
    );
  };
 
  // Show loading state while fetching plans
  if (isLoadingPlans) {
    return (
      <div className="min-h-screen bg-pink-50">
        <div className="flex items-center p-4 bg-white border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Choose Your Plan</h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-gray-600">Loading plans...</div>
        </div>
      </div>
    );
  }
 
  // Show error state if no plans are available
  if (!planDetails || Object.keys(planDetails).length === 0) {
    return (
      <div className="min-h-screen bg-pink-50">
        <div className="flex items-center p-4 bg-white border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-900">Choose Your Plan</h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-red-500">Failed to load plans. Please try again.</div>
        </div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-pink-50 font-sans relative">
      {/* Header */}
      <div className="flex items-center p-4 bg-white border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-900">Choose Your Plan</h1>
      </div>
 
      {/* Content Container with consistent max-width and centering */}
      <div className="max-w-4xl mx-auto pb-20">
        {/* Plan Selection - Horizontal Layout */}
        <div className="flex gap-3 p-4 overflow-x-auto justify-center items-stretch min-h-[300px]">
          {Object.entries(planDetails).map(([key, plan]) => (
            <PlanCard
              key={key}
              planKey={key}
              plan={plan}
              displayData={planDisplayData[key] || {
                emoji: "📋",
                color: "blue",
                displayName: plan.name
              }}
            />
          ))}
        </div>
 
        {/* Duration Selection */}
        {selectedPlanData && (
          <div className="bg-white mx-4 mb-4 rounded-2xl p-4">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Select Duration</h2>
            {Object.entries(selectedPlanData.offerPrice || {}).map(([months, offerPrice]) => (
              <DurationCard
                key={months}
                months={months}
                price={selectedPlanData.price?.[months] || 0}
                offer={offerPrice}
              />
            ))}
          </div>
        )}
 
        {/* Features Preview */}
        {selectedPlanData && selectedPlanDisplay && (
          <div className="bg-white mx-4 mb-4 rounded-2xl p-4 flex flex-col items-center">
            <div className="flex items-center mb-4">
              <span className="text-xl mr-2">{selectedPlanDisplay.emoji}</span>
              <h2 className="text-base font-semibold text-gray-900">{selectedPlanDisplay.displayName} Features</h2>
            </div>
            <div className="space-y-2">
              {selectedPlanData.features?.map((feature, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2 text-sm font-bold">✓</span>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* Security Note */}
        <div className="bg-blue-50 mx-4 mb-4 rounded-2xl p-4">
          <div className="flex items-center mb-2">
            <span className="text-xl mr-2">🛡️</span>
            <h3 className="text-sm font-semibold text-blue-800">Secure Payment</h3>
          </div>
          <p className="text-xs text-blue-700 leading-relaxed">
            Your payment is processed securely through Razorpay. We don&apos;t store your card details.
          </p>
        </div>
 
        {/* Payment Summary */}
        {selectedPlanData && selectedPlanDisplay && (
          <div className="bg-white mx-4 mb-4 rounded-2xl p-4">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Payment Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">{selectedPlanDisplay.displayName} Plan</span>
                <span className="text-sm font-medium text-gray-900">
                  ₹{selectedPlanData.offerPrice?.[selectedDuration]}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Duration</span>
                <span className="text-sm font-medium text-gray-900">
                  {selectedDuration} Month{selectedDuration > 1 ? "s" : ""}
                </span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between">
                <span className="text-base font-semibold text-gray-900">Total Amount</span>
                <span className="text-xl font-bold text-gray-900">
                  ₹{selectedPlanData.offerPrice?.[selectedDuration]}
                </span>
              </div>
            </div>
          </div>
        )}
 
        {/* Payment Methods */}
        <div className="text-center mx-4 mb-4">
          <p className="text-xs text-gray-600 mb-2">Accepted Payment Methods</p>
          <div className="flex gap-2 justify-center flex-wrap">
            {["Visa", "Mastercard", "UPI", "Net Banking"].map((method) => (
              <div key={method} className="bg-gray-100 px-3 py-1.5 rounded-lg">
                <span className="text-xs text-gray-700">{method}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* Payment Button - Fixed at bottom with proper spacing */}
      {selectedPlanData && (
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
          <div className="max-w-4xl mx-auto p-4">
            <button
              className={`
                w-full rounded-2xl border-none transition-opacity
                ${(isProcessing || isLoading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              onClick={handlePayment}
              disabled={isProcessing || isLoading}
            >
              <div className="flex justify-center items-center p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-red-400">
                <span className="text-xl mr-2">💳</span>
                <span className="text-white text-lg font-semibold">
                  {isProcessing || isLoading
                    ? "Processing..."
                    : `Pay ₹${selectedPlanData.offerPrice?.[selectedDuration]}`}
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default MatrimonyPaymentScreen;