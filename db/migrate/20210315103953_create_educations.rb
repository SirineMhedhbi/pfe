class CreateEducations < ActiveRecord::Migration[6.1]
  def change
    create_table :educations do |t|
      t.string :title
      t.string :degree
      t.string :institute
      t.date :year

      t.timestamps
    end
  end
end
