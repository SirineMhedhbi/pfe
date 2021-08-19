class CompanySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers

  attributes :id, :title, :name, :location, :avatar, :description,
             :github, :linkedin, :facebook, :instagram, :gmail, :site,
             :twitter, :lat, :lng
  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
    
  end
end
