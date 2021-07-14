# frozen_string_literal: true

class User < ApplicationRecord
  include DeviseTokenAuth::Concerns::User
  include ActiveStorageSupport::SupportForBase64
  include Rails.application.routes.url_helpers

  belongs_to :company, class_name: "Company", foreign_key: "company_id", optional: true
  has_many :offers, class_name: "Offer"
  has_many :test_attempts, class_name: "TestAttempt"
  has_one :cv
  has_one_base64_attached :avatar
  has_many :applies

  devise :database_authenticatable, :registerable,:recoverable, :rememberable, :trackable, :validatable, :confirmable


  enum role: [ :admin, :candidat, :company ]

  
  def role_user
    self.role
  end

  
  # def photo
  #   rails_blob_path(self.avatar)
  # end


  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  #devise :database_authenticatable, :registerable,
         #:recoverable, :rememberable, :validatable
  #include DeviseTokenAuth::Concerns::User
end
