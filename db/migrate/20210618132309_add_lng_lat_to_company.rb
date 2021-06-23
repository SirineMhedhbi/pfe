class AddLngLatToCompany < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :lat, :string
    add_column :companies, :lng, :string
  end
end
