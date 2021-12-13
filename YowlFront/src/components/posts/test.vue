<template>
        <div class="cascading-dropdown">
          <div class="dropdown">
            <span>Category:</span>
            <select v-model="selectedCategory">
              <option value="">Select a Category</option>
              <option
                v-for="category in categoriesData"
                :value="category.id"
                :key="category.id"
              >
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>
</template>