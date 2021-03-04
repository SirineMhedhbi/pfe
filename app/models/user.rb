# frozen_string_literal: true

class User < ActiveRecord::Base

  extend Devise::Models #added this line to extend devise model
# Include default devise modules. Others available are:
devise :database_authenticatable, :registerable,:recoverable, :rememberable, :trackable, :validatable, :confirmable, :lockable, :timeoutable

include DeviseTokenAuth::Concerns::User

after_create :send_confirmation_email, if: -> { !Rails.env.test? && User.devise_modules.include?(:confirmable) }

private
def send_confirmation_email
  self.send_confirmation_instructions
end

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  #devise :database_authenticatable, :registerable,
         #:recoverable, :rememberable, :validatable
  #include DeviseTokenAuth::Concerns::User
end
