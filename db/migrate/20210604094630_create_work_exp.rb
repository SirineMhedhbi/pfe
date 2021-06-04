class CreateWorkExp < ActiveRecord::Migration[6.1]
  def change
    create_table :work_exps do |t|
      t.string :title
      t.date :begin_date
      t.date :end_date
      t.string :company
      t.string :description

      t.timestamps
    end
  end
end
