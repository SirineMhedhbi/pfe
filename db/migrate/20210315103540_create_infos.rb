class CreateInfos < ActiveRecord::Migration[6.1]
  def change
    create_table :infos do |t|
      t.string :name
      t.string :email
      t.date :date_of_birth
      t.string :phone
      t.string :address
      t.string :job_title
      t.integer :gender
      t.string :description

      t.timestamps
    end
  end
end
