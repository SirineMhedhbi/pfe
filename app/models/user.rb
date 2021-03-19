# frozen_string_literal: true

class User < ActiveRecord::Base
  enum role: [ :admin, :candidat, :company ] 
  belongs_to :company, class_name: "Company", foreign_key: "company_id", optional: true
  has_many :offers, class_name: "Offer"
  has_one :cv

  extend Devise::Models #added this line to extend devise model
# Include default devise modules. Others available are:
devise :database_authenticatable, :registerable,:recoverable, :rememberable, :trackable, :validatable, :confirmable

include DeviseTokenAuth::Concerns::User



  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  #devise :database_authenticatable, :registerable,
         #:recoverable, :rememberable, :validatable
  #include DeviseTokenAuth::Concerns::User
end
