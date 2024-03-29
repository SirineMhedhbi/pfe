class Company < ApplicationRecord
    include ActiveStorageSupport::SupportForBase64
    include Rails.application.routes.url_helpers
    has_many :users, class_name: "User"
    has_one_base64_attached :avatar

end
