class CreateAnswers < ActiveRecord::Migration[6.1]
  def change
    create_table :answers do |t|
      t.text :answer_content
      t.boolean :is_true
      t.timestamps
    end
    add_column :answers, :question_id, :integer
    add_foreign_key :answers, :questions, column: :question_id
  end
end
