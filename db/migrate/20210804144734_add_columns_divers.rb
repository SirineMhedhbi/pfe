class AddColumnsDivers < ActiveRecord::Migration[6.1]
  def change
    add_column :offers, :category_id, :integer
    add_foreign_key :offers, :categories, column: :category_id
    add_column :companies, :image, :string
  end
end
