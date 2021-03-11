class AddAttributsToUseres < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :jobtitle, :string
    add_column :users, :phone, :string
    add_column :users, :birthday, :date
    add_column :users, :address, :string
    add_column :users, :gender, :string
    add_column :users, :longitude, :float
    add_column :users, :latitude, :float

  end

end
