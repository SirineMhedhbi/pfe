class TestAttempt < ApplicationRecord
    belongs_to :offer_test, class_name: "OfferTest", foreign_key: "offer_test_id"
    belongs_to :user, class_name: "User", foreign_key: "user_id"


end
