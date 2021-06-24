class CreateQuestions < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.text :question_content
      t.timestamps
    end
    add_column :questions, :offer_test_id, :integer
    add_foreign_key :questions, :offer_tests, column: :offer_test_id
  end
end
