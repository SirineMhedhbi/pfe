class CreateWorkExps < ActiveRecord::Migration[6.1]
  def change
    create_table :work_exps do |t|

      t.timestamps
    end
  end
end
