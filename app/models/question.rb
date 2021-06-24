class Question < ApplicationRecord
    belongs_to :offer_test, class_name: "OfferTest", foreign_key: "offer_test_id"
    has_many :answers, class_name: "Answer"
end
