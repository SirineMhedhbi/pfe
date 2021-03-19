class CreateSkillsTable < ActiveRecord::Migration[6.1]
  def change
    create_table :skills do |t|
      t.string :title
      t.string :name
      t.integer :pourcentage

      t.timestamps
    end
  end
end
