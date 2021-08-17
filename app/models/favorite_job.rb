class FavoriteJob < ApplicationRecord
    belongs_to :offer, class_name: "Offer", foreign_key: "offer_id"
    belongs_to :user, class_name: "User", foreign_key: "user_id"
end
