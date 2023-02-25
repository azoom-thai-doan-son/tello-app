<template>
  <div class="form-group field">
    <input
      type="input"
      class="form-field"
      :placeholder="label"
      name="name"
      id="name"
      required
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <label for="name" class="form-label">{{ label }}</label>
  </div>
</template>
<script>
export default {
  name: 'AppInput',
  props: ['value', 'label'],
};
</script>
<style scoped lang="scss">
$primary: #11998e;
$secondary: #38ef7d;
$white: #fff;
$gray: #9b9b9b;
.form-group {
  position: relative;
  padding: 15px 0 0;
  width: 100%;
  margin-bottom: 12px;
}

.form-field {
  width: 100%;
  border: 0;
  border-bottom: 2px solid $gray;
  outline: 0;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  font-size: 1.1rem;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form-label {
    cursor: text;
    top: 25px;
  }
}

.form-label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  color: $gray;
}

.form-field:focus {
  ~ .form-label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    color: #1976d2;
  }
  padding-bottom: 6px;
  border-width: 1px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}
/* reset input */
.form-field {
  &:required,
  &:invalid {
    box-shadow: none;
  }
}
</style>
