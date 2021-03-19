class CreateLinks < ActiveRecord::Migration[6.1]
  def change
    create_table :links do |t|
      t.string :facebook
      t.string :linkedin
      t.string :instagram

      t.timestamps
    end
  end
end
