class AddLatLngToOffers < ActiveRecord::Migration[6.1]
  def change
    add_column :offers, :lat, :float
    add_column :offers, :lng, :float
  end
end
