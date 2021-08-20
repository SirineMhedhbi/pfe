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
  has_one_base64_attached :uploaded_cv

  has_many :applies
  has_many :favorite_jobs

  devise :database_authenticatable, :registerable,:recoverable, :rememberable, :trackable, :validatable, :confirmable, :omniauthable, :omniauth_providers => [:google_oauth2]


  enum role: [ :admin, :candidat, :company ]

  
  def role_user
    self.role
  end
  def self.current
    Thread.current[:user]
  end
  def self.current=(user)
    Thread.current[:user] = user
  end
  def uploaded_cv_pdf
    rails_blob_path(self.uploaded_cv, only_path: true) if self.uploaded_cv.attached?
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
