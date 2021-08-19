class Offer < ApplicationRecord
    include Rails.application.routes.url_helpers

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
    def current_user_company()
        {company: User.current.company, avatar:  rails_blob_path(User.current.company.avatar, only_path: true)  }
        
    end
    def offer_company()
        {company: self.user.company, avatar:  rails_blob_path(self.user.company.avatar, only_path: true)  }  
        
    end
    

    
end
