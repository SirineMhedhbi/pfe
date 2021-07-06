class OfferTest < ApplicationRecord
	belongs_to :offer, class_name: "Offer", foreign_key: "offer_id" , optional: :true
	has_many	:questions, class_name: "Question"
end
