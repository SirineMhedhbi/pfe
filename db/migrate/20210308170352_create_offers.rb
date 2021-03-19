class CreateOffers < ActiveRecord::Migration[6.1]
  def change
    create_table :offers do |t|
      t.string :title
      t.string :category
      t.string :name
      t.string :location
      t.string :type

      t.timestamps
    end
  end
end
