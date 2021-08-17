class Offer < ApplicationRecord
    enum job_experience: [ :junior, :senior ]
    belongs_to :user, class_name: "User", foreign_key: "user_id"
    enum job_time: [:full_time, :part_time, :intern]
    has_one :offer_test
    has_many :applies
    has_many :favorite_jobs
    belongs_to :category, class_name: "Category", foreign_key: "category_id"

    def is_favorite_job()
        FavoriteJob.where(offer_id: self.id, user_id: User.current.id).present?
    end
    def already_applied
        Apply.where(offer_id: self.id, user_id: User.current.id).present?
    end
end
