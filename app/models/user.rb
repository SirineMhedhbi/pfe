# frozen_string_literal: true

class User < ApplicationRecord
  belongs_to :company, class_name: "Company", foreign_key: "company_id", optional: true
  has_many :offers, class_name: "Offer"
  has_one :cv

  devise :database_authenticatable, :registerable,:recoverable, :rememberable, :trackable, :validatable, :confirmable

  include DeviseTokenAuth::Concerns::User

  enum role: [ :admin, :candidat, :company ]
  def role_user
    self.role
  end


  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  #devise :database_authenticatable, :registerable,
         #:recoverable, :rememberable, :validatable
  #include DeviseTokenAuth::Concerns::User
end
