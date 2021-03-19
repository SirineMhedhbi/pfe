class CreateCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :companies do |t|
      t.string :title
      t.string :category
      t.string :name
      t.string :location
      t.string :type
      t.string :description

      t.timestamps
    end
  end
end
